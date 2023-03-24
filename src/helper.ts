import * as fs from 'fs';
import * as xml2js from 'xml2js';


export async function combiner(xmlPath: string, csPath: string): Promise<string> {
    const xmlObject = await generateXmlObj(xmlPath);
    const locators: string[]= await generateLocators(xmlObject);
    const paths = locators.map((loc) => {
        const value = getValueByLocator(xmlObject, loc);
        if(isCsharpPath(value)) {
            const fileName = csPath;
            const methodName = getMethodName(value);
            let code = getCode(fileName, methodName);
            if (code) {
              code = `@{` + code + `}`;
              updateValueByLocator(xmlObject,loc,code);
            }
        }
        return value;
      });

    // Convert the XML object back to an XML string
    const builder = new xml2js.Builder();
    const combinedXmlString = builder.buildObject(xmlObject);
    return combinedXmlString;
}

function getCode(fileName: string, methodName: string ) {
    const csharpCode = fs.readFileSync(require.resolve(fileName), 'utf-8');
    // Extract the method code
    const methodRegex = new RegExp(`(?<=\\b${methodName}\\b\\s*\\([^)]*\\)\\s*\\{)[^{}]*(?:\\{[^{}]*\\}[^{}]*)*(?=})`);
    const methodMatch = csharpCode.match(methodRegex);

    if (!methodMatch) {
        console.error(`Method "${methodName}" not found in file "${fileName}"`);
      }
    return methodMatch ? methodMatch[0] : null;
}

interface XmlNode {
    [key: string]: any;
}
  
interface StackItem {
    node: XmlNode;
    locator: string;
}

export async function generateLocators(xmlObject: any): Promise<string[]> {

      const locators: string[] = [];
      const stack: StackItem[] = [{ node: xmlObject, locator: '' }];
    
      while (stack.length > 0) {
        const { node, locator } = stack.pop()!;
    
        for (const key in node) {
          const value = node[key];
          const childLocator = `${locator}.${key}`;
          if (key === 'value') {
            locators.push(transformLocatorString(childLocator));
          } else if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              stack.push({ node: value[i], locator: `${childLocator}[${i}]` });
            }
          } else if (typeof value === 'object') {
            stack.push({ node: value, locator: childLocator });
          }
        }
      }
    
      return locators;
  }


function getValueByLocator(xmlObject: XmlNode, locator: string): any {
    if (!xmlObject) {
      return undefined;
    }
  
    const keys = locator.split('.').map((key) => {
      if (key.endsWith(']')) {
        const [name, index] = key.slice(0, -1).split('[');
        return { name, index: parseInt(index) };
      } else {
        return { name: key };
      }
    });
  
    return keys.reduce((node: any, { name, index }) => {
      if (!node || node[name] === undefined) {
        return undefined;
      }
  
      if (index !== undefined) {
        return node[name][index];
      } else {
        return node[name];
      }
    }, xmlObject);
}

// tested
function updateValueByLocator(xmlObject: XmlNode, locator: string, newValue: any): void {
    const keys = locator.split('.').map((key) => {
      if (key.endsWith(']')) {
        const [name, index] = key.slice(0, -1).split('[');
        return { name, index: parseInt(index) };
      } else {
        return { name: key };
      }
    });
  
    const finalKey = keys.pop();
    if (!finalKey || !finalKey.name) {
      return;
    }
  
    const node = keys.reduce((node: any, { name, index }) => {
      if (!node || node[name] === undefined) {
        return undefined;
      }
  
      if (index !== undefined) {
        return node[name][index];
      } else {
        return node[name];
      }
    }, xmlObject);
  
    if (node && node[finalKey.name] !== undefined) {
      if (finalKey.index !== undefined) {
        node[finalKey.name][finalKey.index] = newValue;
      } else {
        node[finalKey.name] = newValue;
      }
    }
}

function isCsharpPath(value: string): boolean {
    return value.startsWith('@{') && value.endsWith('}');
}

function getMethodName(value: string): string {
    var fileNameMethod = value.replace('@{','');
    fileNameMethod = fileNameMethod.replace('}', '');
    return fileNameMethod;
}

export async function generateXmlObj(absoluteFilePath: string) {
    const xmlString = fs.readFileSync(require.resolve(absoluteFilePath), 'utf-8');
    return await xml2js.parseStringPromise(xmlString);
}

function transformLocatorString(locator: string): string {
    if (locator.startsWith('.')) {
        locator = locator.substring(1);
    }
    return `${locator}[0]`;
}
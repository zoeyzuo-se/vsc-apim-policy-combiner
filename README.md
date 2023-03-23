# Azure API Management Policy Combiner Extension
## Overview

The Azure API Management Policy Combiner extension for Visual Studio Code allows you to write complex C# code in a separate file and reference it within your policy XML files, simplifying the process of writing API management policies.

Normally, policy code is written in a syntax resembling C# in the @{ } block in the policy XML file. This approach can be challenging, as syntax highlighting is not always reliable and there is no built-in way to debug C# code in the policy file. The Azure API Management Policy Combiner extension solves these issues by allowing you to write the C# code in a separate file, in a method, and then referencing that method within your policy file.

With this extension, you can write your C# code in a more readable and maintainable format, making it easier to create and maintain complex policies.

## Features
- Allows you to write your policy code in a separate C# file in a method.

- Provides easy integration with the policy XML file. You only need to specify the method name in the XML file, and the extension will automatically insert the C# code in the correct place in the policy file.

- Enables syntax highlighting and debugging of C# code in the separate file, improving code quality and reducing errors.

- Generates the final XML file with the C# code correctly inserted in the policy file, ensuring a seamless and error-free process.

- Supports various policy files in one project.

## Installation
- Open Visual Studio Code.

- Open the Extensions sidebar by pressing `Ctrl+Shift+X` or `Cmd+Shift+X` on macOS.

- Search for "Azure API Management Policy Combiner" and click install.

- Restart Visual Studio Code.

## Usage
1. Create a C# file that contains your policy code. You can use any file name and location that suits your needs.
2. Write your C# code in a method inside the file, e.g. MyMethod.
3. In the policy XML file, replace the @{ } block with the method name, e.g. MyMethod().
4. Save the policy XML file.
5. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
6. Search for "Policy Combiner" and select it.
7. It will ask you to choose 2 files. One c# file and the other xml file.
8. The extension will generate the final XML file with the C# code correctly inserted in the policy file.
9. If you are not in a workspace, the extension will ask where would you like to store the file.
10. Choose a location and save the file.

## Contributing
Contributions to the Azure API Management Policy Combiner extension are always welcome. If you find a bug or have a feature request, please open an issue on the GitHub repository. If you would like to contribute code, please fork the repository and submit a pull request with your changes.
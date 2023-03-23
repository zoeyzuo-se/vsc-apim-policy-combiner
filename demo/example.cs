using Newtonsoft.Json.Linq;

public static class ResponseHelper
{
    public static string RemoveSensitiveData(JObject response)
    {
        foreach (var key in new[] { "hair_color", "skin_color", "eye_color", "gender" })
        {
            response.Property(key)?.Remove();
        }

        return response.ToString();
    }

    public static string retrieveJWT(JObject context)
    {
        Jwt jwt;
        context.Request.Headers.GetValueOrDefault("Authorization","scheme param").Split(' ').Last().TryParseJwt(out jwt);
        return jwt.Claims.GetValueOrDefault("name", "?");
    }
}
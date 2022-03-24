import groovy.json.JsonSlurper

def buildApp() {
    echo "building the application ..."
}

void getSecret(serverUrl, username, password, secretId) {
  def baseUrl = new URL(serverUrl);
  def path = new URL(baseUrl, "oauth2/token");
  def post = path.openConnection();

  //TODO: encode
  def urlParameters = "username=${username}&password=${password}&grant_type=password";
  post.setRequestMethod("POST")
  post.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
  post.setDoOutput(true)

  DataOutputStream wr = new DataOutputStream (
                              post.getOutputStream ()
                      );
  wr.writeBytes (urlParameters);
  wr.flush ();
  wr.close ();  

  println "authorize";
  def postRC = post.getResponseCode();

  if(postRC.equals(200)) {
    println "authorize request complete:";

    def resp = (post.getInputStream().getText());
    def jsonSlurper = new JsonSlurper()
    def obj = jsonSlurper.parseText(resp);
    def access_token = obj.access_token;

    if (access_token != null) {
      println "access token available:";

      baseUrl = new URL(serverUrl);
      path = new URL(baseUrl, "api/v1/secrets/${secretId}");
      def get = path.openConnection();

      get.setRequestProperty("Authorization", "Bearer " + access_token);
      get.setRequestMethod("GET")

      //get secret
      postRC = get.getResponseCode();

      if(postRC.equals(200)) {
        println "get secret result"
        println get.getInputStream().getText()
      }
      else {
        println "error:";
        println get.getInputStream().getText();
      }
    }
  }
}

return this;
def buildApp() {
    echo "building the application ..."
}

// @Grab('org.apache.commons:commons-math3:3.4.1')
@Grab('com.thycotic:devops-secrets-vault-sdk:1.0.0');
import org.apache.commons.math3.primes.Primes
void parallelize(int count) {
  if (!Primes.isPrime(count)) {
    error "${count} was not prime"
  }
  // …
}

return this;
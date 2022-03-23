def buildApp() {
    echo "building the application ..."
}

@Grab('com.thycotic:devops-secrets-vault-sdk:1.0.1');
import org.apache.commons.math3.primes.Primes
void parallelize(int count) {
  if (!Primes.isPrime(count)) {
    error "${count} was not prime"
  }
  // …
}

return this;
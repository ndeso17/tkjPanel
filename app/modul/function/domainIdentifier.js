const domainIdentifier = (domain, ns1, ns2) => {
  const domainArray = domain.split(".");
  const jumlahKata = domainArray.length;

  return new Promise((resolve, reject) => {
    let iniDomain;
    if (jumlahKata >= 2 && jumlahKata <= 5) {
      iniDomain = {
        inputDomain: domain,
        jumlahKata: jumlahKata,
        nameserver1: ns1,
        nameserver2: ns2,
        statusDomain: true,
      };
    } else {
      iniDomain = {
        inputDomain: domain,
        jumlahBagian: jumlahKata,
        nameserver1: ns1,
        nameserver2: ns2,
        statusDomain: false,
      };
    }
    resolve(iniDomain);
  });
};

module.exports = domainIdentifier;

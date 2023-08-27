const domainIdentifier = (domain) => {
  const domainArray = domain.split(".");
  const jumlahKata = domainArray.length;

  return new Promise((resolve, reject) => {
    let iniDomain;
    if (jumlahKata >= 2 && jumlahKata <= 5) {
      iniDomain = {
        inputDomain: domain,
        jumlahKata: jumlahKata,
        statusDomain: true,
      };
    } else {
      iniDomain = {
        inputDomain: domain,
        jumlahBagian: jumlahKata,
        statusDomain: false,
      };
    }
    resolve(iniDomain);
  });
};

module.exports = domainIdentifier;

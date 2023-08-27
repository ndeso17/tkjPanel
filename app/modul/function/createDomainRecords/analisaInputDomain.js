const fs = require("fs");
const buatDomainBaruDgPTR = require("./createNewDomain");
const createNewSubdomain = require("./createNewSubdomain");

const analisaInputDomain = async (
  identifikasiDomain,
  identifikasiIP,
  pengecekanDomain
) => {
  const domain = identifikasiDomain.inputDomain;
  const ns1 = identifikasiDomain.nameserver1;
  const ns2 = identifikasiDomain.nameserver2;
  const ipAddress = identifikasiIP.ipAddressDomain;
  const akhirIpAddress = identifikasiIP.akhirIPAddressv4;
  const ipAddrArpa = identifikasiIP.ipInAddrArpa;
  const domainCocok = pengecekanDomain.kecocokanDomain;
  const fileCocok = pengecekanDomain.domainCocokDengan;
  const arrayFileKonfigurasiDomain = pengecekanDomain.fileKonfigurasiDomain;

  return new Promise(async (resolve, reject) => {
    let targetPemeriksaan;
    let containsNs1 = false;
    let containsDomain = false;

    let dataPesan;
    if (fileCocok != null) {
      targetPemeriksaan = `/etc/bind/tPanel/${fileCocok}`;
      const data = fs.readFileSync(targetPemeriksaan, "utf8");
      containsNs1 = data.includes(ns1);
    } else {
      for (const fileKonfigurasi of arrayFileKonfigurasiDomain) {
        targetPemeriksaan = `/etc/bind/tPanel/${fileKonfigurasi}`;

        try {
          const data = fs.readFileSync(targetPemeriksaan, "utf8");
          containsNs1 = data.includes(ns1);
          if (containsNs1) {
            break;
          }
        } catch (err) {
          console.error("Terjadi kesalahan saat membaca file:", err);
        }
      }
    }

    if (containsNs1 && !domainCocok) {
      const buatDomainWPTR = await buatDomainBaruDgPTR(
        domain,
        ns1,
        ns2,
        ipAddress,
        ipAddrArpa,
        akhirIpAddress
      );
      dataPesan = buatDomainWPTR;
    } else if (containsNs1 && domainCocok) {
      targetPemeriksaan = `/etc/bind/tPanel/${pengecekanDomain.domainCocokDengan}`;
      const arrayDomain = domain.split(".");
      const subdomain = arrayDomain[0];
      // const subdomain
      const data = fs.readFileSync(targetPemeriksaan, "utf8");
      containsDomain = data.includes(subdomain);
      if (containsDomain) {
        dataPesan = {
          pesanBerhasil: `Semua analisa berhasil!`,
          pesanError: `Anda tidak dapat membuat sub domain yang sama berulang kali!!!`,
          dataAnalisa: pengecekanDomain,
        };
      } else {
        const subdomain = await createNewSubdomain(
          domain,
          ns1,
          ipAddress,
          akhirIpAddress,
          fileCocok
        );
        dataPesan = subdomain;
      }
    } else {
      dataPesan = {
        status: false,
        pesan: "Nameserver invalid",
      };
    }

    resolve(dataPesan);
  });
};

module.exports = analisaInputDomain;

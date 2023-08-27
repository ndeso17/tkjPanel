# tkjPanel

## Deskripsi

tkjPanel adalah aplikasi berbasis Node.js yang memiliki fungsionalitas untuk mengelola panel administrasi server. Aplikasi ini dapat membantu dalam mengelola berbagai tugas administratif server dengan lebih efisien.

## Bahasa Pemrograman

Aplikasi ini dikembangkan menggunakan bahasa pemrograman Node.js dan Framework Laravel sebagai UI.

## Setup Aplikasi

1. Pastikan Anda memiliki Node.js terinstal di sistem Anda.
2. Lakukan instalasi dependensi dengan menjalankan perintah berikut di terminal:
3. Clone repositori tkjPanel UI dari [link repository UI](https://github.com/ndeso17/tkjPanel-UI) dan [link repository Server](https://github.com/ndeso17/tkjPanel-BE).
4. Pastikan Anda mengikuti instruksi instalasi di repositori tkjPanel UI.
5. Jika Anda menggunakan linux harap menambahkan interface tunnel dengan perintah tunctl -t (nama tunnel)
6. Pastikan interface tersebut memiliki IP 192.168.12.1 (Ini program beta jadi nurut saja dulu, tetapi jika Anda sudah expert ya sudah terserah anda.)
7. Jika Anda menggunakan MacOs saya belum pernah memakai MacOs jadi ya anda Anda pikir sendiri bagaimana caranya menambahkan tunnel seperti step ke 5.
8. Jika Anda menggunakan Jendela, zaman sekarang masih pakai OS bajakan? Tobat lah saudara kuh.😊 Pikirkan sendiri juga bagaimana caranya agar punya interface tambahan dan menjalankan apache2 serta bind9.😒
9. Semua step diatas sifatnya sementara, mari bergabung dengan saya untuk menyempurnakan aplikasi ini supaya bisa bermanfaat untuk sesama.
10. Pastikan Anda telah mengedit .env sesuai dengan yang Anda pakai di server Anda. Dan pastikan juga Anda mempunyai tabel tkjPanel pada /home/ serta tPanel pada /etc/bind/

## Menjalankan Aplikasi

Setelah melakukan instalasi dan konfigurasi awal, Anda dapat menjalankan aplikasi dengan perintah:

- `npm run api` untuk menjalankan server dari UI.
- `php artisan serve --host=192.168.12.1` untuk menjalankan UI.

## Akses Aplikasi

Jika Anda [PSIKOPAT](https://en.wikipedia.org/wiki/Psychopathy) maka Anda dapat mengakses aplikasi melalui browser dengan mengunjungi alamat: http://192.168.12.1:8000 [BERCANDA!](https://id.wiktionary.org/wiki/bercanda) 😑

## Kontribusi

Jika Anda ingin berkontribusi pada pengembangan aplikasi ini, silakan ikuti langkah-langkah berikut:

1. Fork repositori ini.
2. Lakukan perubahan dan tambahkan fitur baru di forked repository Anda.
3. Buat pull request untuk menggabungkan perubahan Anda ke repositori utama.

## Lisensi

Aplikasi ini dilisensikan di bawah [MIT License](LICENSE).

---

# Dikembangkan oleh [ndeso17]

---

ENGLISH LANGUAGE

## Description

tkjPanel is a Node.js-based application that provides functionalities for managing server administration panels. This application can assist in efficiently managing various administrative tasks of a server.

## Programming Language

This application is developed using the Node.js programming language and the Laravel Framework for the user interface.

## Application Setup

1. Make sure you have Node.js installed on your system.
2. Install the dependencies by running the following command in the terminal:
3. Clone the tkjPanel UI repository from [UI repository link](https://github.com/ndeso17/tkjPanel-UI) and [Server repository link](https://github.com/ndeso17/tkjPanel-BE).
4. Follow the installation instructions provided in the tkjPanel UI repository.
5. If you are using Linux, please add a tunnel interface using the command: tunctl -t (tunnel name)
6. Ensure that the interface has an IP address of 192.168.12.1 (This is a beta program, so follow along for now, but if you are an expert, you can modify it as needed.)
7. If you are using MacOS, I haven't used MacOS before, so you'll have to figure out how to add a tunnel interface like in step 5.
8. If you're using Windows, are you still using a pirated operating system these days? Repent, my friend. 😊 Also, think for yourself how to have an additional interface and run apache2 and bind9. 😒
9. All the above steps are temporary. Let's join hands to improve this application to make it beneficial for everyone.
10. Make sure you have edited the .env according to what you are using on your server.

## Running the Application

After completing the installation and initial setup, you can run the application using the following commands:

- `npm run api` to run the server.
- `php artisan serve --host=192.168.12.1` to run the UI.

## Accessing the Application

If you're [PSYCHOPATH](https://en.wikipedia.org/wiki/Psychopathy), you can access the application through a browser by visiting the address: http://192.168.12.1:8000 JUST [KIDDING!](https://en.wiktionary.org/wiki/bercanda) 😑

## Contribution

If you'd like to contribute to the development of this application, please follow these steps:

1. Fork this repository.
2. Make changes and add new features in your forked repository.
3. Create a pull request to merge your changes into the main repository.

## License

This application is licensed under the [MIT License](LICENSE).

---

Developed by [ndeso17]

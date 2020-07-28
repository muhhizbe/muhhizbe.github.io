# FOOTBALL DATA PWA

Aplikasi untuk memenuhi tugas submission 3 MPWA dari dicoding.com

## Installation

gunakan npm atau yarn

```bash
npm install web-push
```

## Usage
1. Jalankan
```
web-push generate-vapid-keys --json
``` 
2. isikan *publicKey* dan *privateKey* ke dalam file `push.js`
3. isikan juga *publicKey* ke dalam *aplicationServerKey* yang berada di file `index.js`
4. jangan lupa untuk mengisikan hasil `subscribe` yang di dapatkan dari console browser, yaitu *endpoitUrl*, *auth*, *p256h* ke dalam file `push.js`
5. buka terminal di dalam folder proyek, kemudian jalankan
```
node push.js
```
## Closing
Mohon koreksi dan sarannya untuk bahan belajar saya, supaya saya dapat lebih berkembang.
## Lojistisyen.net NodeJS API Development from Scratch

Lojistisyen.net api service written in nodejs. It is available as open source code.

## API Learning

```bash
        "/api/kaydol": "signup",
        "/api/giris": "signin",
        "/api/cikis": "signout",
        "/api/uyeler": "get all users",
        "/api/uye/:userId": "get/update/delete user",
        "/api/haberler": "get all posts",
        "/api/haber/yeni/:userId": "create new post",
        "/api/haberler/yazar/:userId": "get posts by user",
        "/api/haber/:postId": "update/delete post",
        "/api/durumlar": "get all walls",
        "/api/durum/yeni/:userId": "create new wall",
        "/api/durumlar/yazar/:userId": "get walls by user",
        "/api/durum/:postId": "update/delete wall"
```

## Installing

```bash
   git clone https://github.com/mrozdev/lojistisyen-api.git example-api
   cd example-api                  # Change current directory to the newly created one
   npm install
   npm run dev                     # Node.js API app run inside
```

---
Made with ♥ by Melih Özdemir ([@mrozdev](https://sorcial.com/mrozdev))

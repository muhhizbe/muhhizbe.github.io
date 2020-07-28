let webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BLCsFryTW6NfHmWtJCs3xcJv1KngpxaWQLsdSnfQKhUHQIpQ_bd9FAy10RVcpWEvdfkikxvQKwxqak3xbDV-yAs",
    "privateKey": "h4Tbo07mBu7tIi3Sr1Aa6RPxTgdZTaVUSn2yNx7Ztdo"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dOm7dhOCloo:APA91bHOrk3UdhRjMO-vwf7y4KLERqNgmf-b7Q9qaCD5B63Esuexd_JaLfmHYLrHzt0jdDRD-rkfJy3kqHSQH3B4OAuhaasWScUVXJWsMASJOk5O31gi8dnbNp653x-ivMdg2YB_dlqZ",
    "keys": {
        "p256dh": "BK6Zud1TJ+JeN+GPrHFSFa/7g7nUXrdBdXg6UEloAIM2CRXnrWQl8jftv5WRxRYwnCDlvhh9Cgumn0WEb5D3Unk=",
        "auth": "r0SGy+CChfTtR7YXDBmuLA=="
    }
};
let payload = 'Terimakasih telah tampil notifikasi';
let options = {
    gcmAPIKey: '636203774421',
    TTL: 60,
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
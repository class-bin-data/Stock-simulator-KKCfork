// 简易加密工具 - 用于本地存储加密
const Crypto = {
    // 简单的异或加密
    xorEncrypt(text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    },
    
    // Base64编码
    toBase64(text) {
        try {
            return btoa(unescape(encodeURIComponent(text)));
        } catch (e) {
            return btoa(text);
        }
    },
    
    // Base64解码
    fromBase64(text) {
        try {
            return decodeURIComponent(escape(atob(text)));
        } catch (e) {
            return atob(text);
        }
    },
    
    // 加密
    encrypt(text, key = 'stock-simulator-2024') {
        const xorResult = this.xorEncrypt(text, key);
        return this.toBase64(xorResult);
    },
    
    // 解密
    decrypt(encryptedText, key = 'stock-simulator-2024') {
        try {
            const xorResult = this.fromBase64(encryptedText);
            return this.xorEncrypt(xorResult, key);
        } catch (e) {
            return null;
        }
    },
    
    // 生成简单哈希
    hash(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(8, '0');
    },
    
    // 生成UUID
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

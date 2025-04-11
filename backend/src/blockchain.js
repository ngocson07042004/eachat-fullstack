const SHA256 = require('crypto-js/sha256')

class Block{
    // Hàm tạo Block
    constructor(data, timestamp, previousHash = '') {
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    // Tinh toán mã hash
    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }

    // Lấy mã hash
    getHash(){
        return this.previousHash
    }
}

class Blockchain{
    // Hàm tạo các chuỗi Blockchain
    constructor(includeGenesis = true) {
        this.chain = includeGenesis ? [this.createGenesisBlock()] : []
    }

    // Hàm tạo giá trị blockchain đầu tiên
    createGenesisBlock(){
        return new Block("Genesis Block", "2025-01-01T00:00:00.000Z", "0")
    }

    // Lấy block cuối cùng
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    // Thêm block mới
    addBlock(newBlock){
        if (this.chain.length > 0){
            newBlock.previousHash = this.getLatestBlock().hash
        }
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    // Kiểm tra các block có hợp lệ
    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i]
            const previous = this.chain[i - 1]

            if (current.hash !== current.calculateHash()) return false
            if (current.previousHash !== previous.hash) return false
        }
        return true
    }
}

module.exports = { Blockchain, Block }

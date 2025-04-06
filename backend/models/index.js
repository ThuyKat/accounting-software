import sequelize from "../dbConfig"
import Account from "./Account.js"
import JournalEntry from "./JournalEntry.js"
import JournalLine from "./JournalLine.js"
import Product from "./Product.js"

const db ={
    sequelize,
    Account,
    JournalEntry,
    JournalLine,
    Product
}
export default db
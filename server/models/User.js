class User {
  constructor(doc) {
    this._id = doc._id;
    this.user = doc.user;
    this.img = doc.img;
    this.modified = doc.modified;
    this.created = doc.created;
  }

  toJSON() {
    return {
      user: this.user,
      img: this.img,
      modified: this.modified,
      created: this.created,
    };
  }
}



module.exports = User;
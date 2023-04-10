class Note {
    constructor(doc) {
      this._id = doc._id;
      this.content = doc.content;
      this.user = doc.user;
      this.modified = doc.modified;
      this.created = doc.created;
    }
  
    toJSON() {
      return {
        content: this.content,
        user: this.user,
        modified: this.modified,
        created: this.created,
      };
    }
  }
  

  
  module.exports = Note;
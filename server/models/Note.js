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
        noteId: this._id,
        content: this.content,
        user: this.user,
        modified: format.date(this.modified),
        created: format.date(this.created),
      };
    }
  }
  

  
  module.exports = Note;
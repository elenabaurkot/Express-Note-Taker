module.exports = function(app) {
    
    app.get("/api/notes", function(req, res) {
      res.json(tableData);
    });
  
    app.post("/api/notes", function(req, res) {
      
    });
}
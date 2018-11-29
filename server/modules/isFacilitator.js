const pool = require('./pool');

const isFacilitator = (req, res, next) => {
    pool.query(`SELECT "is_facilitator" FROM "person" WHERE "id"=$1;`, [req.user.id])
    .then(results => {
        if(results.rows[0] && results.rows[0].is_facilitator){
            next()
        }
        else {
            res.sendStatus(403);
        }
    })
    .catch(err => {
        console.log('Error checking facilitator status', err);
    })

};
  
module.exports =  isFacilitator ;
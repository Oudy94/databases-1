const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'week2'
});


const mysql_query = [

//1- Write a query that prints names of all Authors and their corresponding Collaborators.
`
SELECT a.author_name, b.author_name AS collaborator_name
FROM authors a
    JOIN authors b
    ON a.collaborator = b.author_no;
`,

//2- Write a query that prints all columns of Authors and their pubished paper_title. If there is an author without any Research_Papers, print the information of that Author too.
`
SELECT author_name, paper_title 
FROM Authors a 
    LEFT JOIN authors_research_papers r
        ON a.author_no = r.author_no
    LEFT JOIN research_papers p
        ON p.paper_id = r.paper_id;
`
];

mysql_query.forEach(element => {
    connection.query(element, function (error, results, fields) {
        if (error) throw error;
    });
});

connection.end();
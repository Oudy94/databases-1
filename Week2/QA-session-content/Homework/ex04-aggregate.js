const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'week2'
});


const mysql_query = [

//1- All research papers and the number of authors that wrote that paper.
`
SELECT paper_title, COUNT(author_no) AS numbers
FROM research_papers p
    JOIN authors_research_papers r
        ON p.paper_id = r.paper_id
GROUP BY paper_title;
`,

//2- Sum of the research papers published by all female authors.
`
SELECT COUNT(*) AS total 
FROM authors_research_papers r
    JOIN authors a
        ON r.author_no = a.author_no
WHERE gender = 'female';
`,

//3- Sum of the research papers published by all female authors.
`
SELECT university, AVG(h_index) AS university_average
FROM authors
GROUP BY university;
`,

//4- Sum of the research papers of the authors per university.
`
SELECT university, COUNT(r.author_no) AS number_of_papers
FROM authors a
    JOIN authors_research_papers r
        ON a.author_no = r.author_no
GROUP BY university;
`,

//5- Minimum and maximum of the h-index of all authors per university.
`
SELECT university, MIN(h_index) AS min, MAX(h_index) AS max
FROM authors
GROUP BY university;
`
];


mysql_query.forEach(element => {
    connection.query(element, function (error, results, fields) {
        if (error) throw error;
    });
});

connection.end();
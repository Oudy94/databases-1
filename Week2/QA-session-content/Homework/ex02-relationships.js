const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'week2'
});


const mysql_query = [

//1- Create another table, called Research_Papers with the following fields: (paper_id, paper_title, conference, publish_date, ...)
`CREATE TABLE research_papers (paper_id INT, paper_title VARCHAR(255), conference VARCHAR(255), publish_date DATE, PRIMARY KEY(paper_id));`,

//2- What is the relationship between Authors and Research papers ? Make necessary changes to Authors and Research_Papers tables and add more tables if necessary.
    //The relationship is Many to Many
`CREATE TABLE authors_research_papers (id INT, author_no INT, paper_id INT, PRIMARY KEY(id), FOREIGN KEY(author_no) REFERENCES authors(author_no), FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id));`,

//3- Read exercises 3 and 4 and then add information (insert rows) of 15 authors and 30 research papers such that all queries in the exercises 3 and 4 will return some answers
`INSERT INTO authors VALUES
    (1, 'Ismail ibn al-Ahmar', 'Morocco university', '1387-01-01', 222, 'male', NULL),
    (2, 'Patricia Aakhus', 'US university', '1952-01-01', 216, 'male', NULL),
    (3, 'Hans Aanrud ', 'Norway university', '1863-01-01', 155, 'male', NULL),
    (4, 'David Aaron', 'US university', '1938-01-01', 255, 'male', NULL),
    (5, 'Jane Aaron ', 'Australia university', '1951-01-01', 155, 'female', NULL),
    (6, 'Soazig Aaron ', 'France university', '1949-01-01', 211, 'male', NULL),
    (7, 'Alexander Aaronsohn ', 'Palestine university', '1888-01-01', 123, 'male', NULL),
    (8, 'Christopher Abani ', 'Nigeria university', '1966-01-01', 189, 'male', NULL),
    (9, 'Sait Faik Abasıyanık ', 'Turkey university', '1906-01-01', 175, 'male', NULL),
    (10, 'Carmine Abate ', 'Italy university', '1954-01-01', 198, 'female', NULL),
    (11, 'Christina Abbey ', 'England university', '1924-01-01', 223, 'male', NULL),
    (12, 'Edward Abbey', 'US university', '1927-01-01', 211, 'male', NULL),
    (13, 'Henry Abbey ', 'Morocco university', '1842-01-01', 299, 'male', NULL),
    (14, 'Lynn Abbey', 'Dutch university', '1948-01-01', 234, 'female', NULL),
    (15, 'Edwin A. Abbott ', 'England university', '1838-01-01', 163, 'male', NULL);`,


`UPDATE authors SET collaborator = (case when author_no = 1 then 5 when author_no = 2 then 1 when author_no = 3 then 10 when author_no = 4 then 9 when author_no = 5 then 4
                                        when author_no = 6 then 14 when author_no = 7 then 2 when author_no = 8 then 13 when author_no = 9 then 7 when author_no = 10 then 8
                                        when author_no = 11 then 6 when author_no = 12 then 3 when author_no = 13 then 11 when author_no = 14 then 15 when author_no = 15 then 12
                                    end)
WHERE author_no BETWEEN 1 AND 15;`,

`INSERT INTO research_papers VALUES
    (1, 'Blue Light', 'Malaysian conference', '1382-01-01'),
    (2, 'Deck In The Occean', 'Italian conference', '1827-01-01'),
    (3, 'The Age of Revolution', 'Middle eastern conference', '2001-01-01'),
    (4, 'The Radicalism of the American Revolution', 'US conference', '1989-01-01'),
    (5, 'The Guns of August', 'Belgum conference', '1387-01-01'),
    (6, 'Plagues and Peoples', 'France conference', '1682-01-01'),
    (7, 'The Decline and Fall of the Roman Empirer', 'Italic conference', '2000-01-01'),
    (8, 'What Is History?', 'Dutch conference', '1237-01-01'),
    (9, 'The Origins of The Second World War', 'Swiss conference', '1387-01-01'),
    (10, 'The Sources of Social Power', 'Germany conference', '1212-01-01'),
    (11, 'The Black Jacobins', 'Brazilian conference', '1887-01-01'),
    (12, 'Liberty before Liberalism', 'Canadian conference', '1767-01-01'),
    (13, 'Gender and the Politics of History', 'Mali conference', '1387-01-01'),
    (14, 'The Search for Modern China', 'Chinese conference', '1387-01-01'),
    (15, 'The Civil War Era', 'Spain conference', '1527-01-01'),
    (16, 'The Great Divergence', 'Russian conference', '1585-01-01'),
    (17, 'Chicago and the Great West', 'US conference', '2004-01-01'),
    (18, 'The Strange Death of Liberal England', 'English conference', '1667-01-01'),
    (19, 'Religion and the Decline of Magic', 'Greece conference', '1181-01-01'),
    (20, 'A History of Ancient Rome', 'Italic conference', '1447-01-01'),
    (21, 'The Century of Revolution', 'Yemen conference', '1603-01-01'),
    (22, 'The Venture of Islam', 'Mekka conference', '1487-01-01'),
    (23, 'Orientalism', 'Jamaica conference', '1884-01-01'),
    (24, 'A History of the Arab Peoples', 'Qatar conference', '1787-01-01'),
    (25, 'Vichy France', 'French conference', '1227-01-01'),
    (26, 'The Renaissance', 'Sudan conference', '1333-01-01'),
    (27, 'The Great Chain of Being', 'Aden conference', '1387-01-01'),
    (28, 'Guns, Germs, and Steel', 'Germany conference', '1234-01-01'),
    (29, 'The Landscape of History', 'Jeddah conference', '1512-01-01'),
    (30, 'Imagined Communities', 'Hardenberg conference', '1484-01-01');`,

    `INSERT INTO authors_research_papers VALUES(1, 1, 1), (2, 1, 2), (3, 2, 3), (4, 3, 3), (5, 4, 4), (6, 5, 5), (7, 5, 6), (8, 7, 6), (9, 8, 8), (10, 8, 8), 
    (11, 8, 8), (12, 9, 9), (13, 10, 11), (14, 11, 12), (15, 11, 13), (16, 12, 14), (17, 14, 14), (18, 14, 15), (19, 14, 16), (20, 14, 17),
    (21, 15, 17), (22, 15, 18), (23, 15, 19), (24, 15, 20), (25, 15, 21), (26, 15, 22);`

];

mysql_query.forEach(element => {
    connection.query(element, function (error, results, fields) {
        if (error) throw error;
    });
});

connection.end();
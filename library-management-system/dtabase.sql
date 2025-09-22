-- Create Database
CREATE DATABASE LibraryManagement;
USE LibraryManagement;

-- Create Authors Table
CREATE TABLE Authors (
    author_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    PRIMARY KEY (author_id)
);

-- Create Books Table
CREATE TABLE Books (
    book_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    published_year YEAR NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    PRIMARY KEY (book_id),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE
);

-- Create Borrowers Table
CREATE TABLE Borrowers (
    borrower_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (borrower_id)
);

-- Create Loans Table
CREATE TABLE Loans (
    loan_id INT NOT NULL AUTO_INCREMENT,
    book_id INT NOT NULL,
    borrower_id INT NOT NULL,
    loan_date DATE NOT NULL,
    return_date DATE,
    PRIMARY KEY (loan_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id) ON DELETE CASCADE
);

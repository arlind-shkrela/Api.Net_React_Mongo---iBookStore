using System;
using System.Collections.Generic;
using iBookStore.Models;
using MongoDB.Driver;

namespace iBookStore.Services
{
    public class AuthorService
    {
        private readonly IMongoCollection<Author> _authors;

        public AuthorService(IBookstoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _authors = database.GetCollection<Author>(settings.AuthorsCollectionName);

        }

        public List<Author> Get() =>
            _authors.Find(book => true).ToList();

        public Author Get(string id) =>
            _authors.Find<Author>(book => book.Id == id).FirstOrDefault();

        public Author Create(Author book)
        {
            _authors.InsertOne(book);
            return book;
        }

        public void Update(string id, Author bookIn) =>
            _authors.ReplaceOne(book => book.Id == id, bookIn);

        public void Remove(Book bookIn) =>
            _authors.DeleteOne(book => book.Id == bookIn.Id);

        public void Remove(string id) =>
            _authors.DeleteOne(book => book.Id == id);
    }

}

using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace iBookStore.Models
{
    public class Book
    {
        public Book()
        {
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string BookName { get; set; }
        public DateTime ReleaseDate { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
    }
}


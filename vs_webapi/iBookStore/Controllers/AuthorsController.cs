using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iBookStore.Models;
using iBookStore.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iBookStore.Controllers
{
    [Route("api/[controller]")]
    public class AuthorsController : Controller
    {
        private readonly AuthorService _authorService;

        public AuthorsController(AuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public ActionResult<List<Author>> Get() =>
            _authorService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAuthor")]
        public ActionResult<Author> Get(string id)
        {
            var author = _authorService.Get(id);

            if (author == null)
            {
                return NotFound();
            }

            return author;
        }

        [HttpPost]
        public ActionResult<AuthorService> Create([FromBody]Author author)
        {
            _authorService.Create(author);

            return CreatedAtRoute("GetAuthor", new { id = author.Id.ToString() }, author);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Author authorId)
        {
            var author = _authorService.Get(id);

            if (author == null)
            {
                return NotFound();
            }

            _authorService.Update(id, authorId);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var author = _authorService.Get(id);

            if (author == null)
            {
                return NotFound();
            }

            _authorService.Remove(author.Id);

            return NoContent();
        }
    }
}

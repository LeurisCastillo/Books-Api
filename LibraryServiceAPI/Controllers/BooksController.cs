using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using LibraryServiceAPI.Models;
using Newtonsoft.Json;

namespace LibraryServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly HttpClient client;
         
        public BooksController(HttpClient httpClient)
        {
            client = httpClient;
        }

        [HttpGet]
        public async Task<IActionResult> getAllBooks()
        {
            HttpResponseMessage response = await client.GetAsync("api/v1/Books");
            response.EnsureSuccessStatusCode();

            return Ok(await response.Content.ReadAsStringAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getBookById(int id)
        {
            HttpResponseMessage response = await client.GetAsync($"api/v1/Books/{id}");
            response.EnsureSuccessStatusCode();

            return Ok(await response.Content.ReadAsStringAsync());
        }

        [HttpPost]
        public async Task<IActionResult> PostBook(Book book)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("api/v1/Books", book);
            response.EnsureSuccessStatusCode();

            // Return url of the created resource.
            return Ok(response.Headers.Location);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            HttpResponseMessage response = await client.PutAsJsonAsync($"api/v1/Books/{id}", book);
            response.EnsureSuccessStatusCode();

            return Ok(await response.Content.ReadAsStringAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            HttpResponseMessage response = await client.DeleteAsync($"api/v1/Books/{id}");
            response.EnsureSuccessStatusCode();

            return Ok();
        }
    }
}
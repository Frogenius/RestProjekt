using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestProjekt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestProjekt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly FoodContext _context;
        //private object food;

        public FoodsController(FoodContext context)
        {
            _context = context;

            
        }
        [HttpGet]
        public IEnumerable<Food> GetFoods()
        {
            try
            {
                return _context.Foods.ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Food> GetFood(int id)
        {
            try
            {
                var Food = _context.Foods.Find(id);

                if (Food == null)
                {
                    return NotFound();
                }

                return Food;

            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpPost]
        public ActionResult<Food> PostFood(Food food)
        {
            try
            {
                _context.Foods.Add(food);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetFood), new { id = food.Id }, food);
            }
            catch (Exception)
            {
                return null;
            }
        }
        [HttpPut("{id}")]
        public ActionResult<Food> PutFood(int id, Food food)
        {
           
                if (id == food.Id)
                {
                    _context.Foods.Update(food);
                    _context.SaveChanges();

                    return NoContent();
                }
            Console.WriteLine("ID:");
            return BadRequest();
            
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteFood(int id)
        {
            try
            {
                var Food = _context.Foods.Find(id);

                if (Food == null)
                {
                    return NotFound();
                }

                _context.Foods.Remove(Food);
                _context.SaveChanges();

                return NoContent();
                                    
            }catch( Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
            
        }
    }
}

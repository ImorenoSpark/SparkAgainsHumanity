using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SparkAgainsHumanity.GameEngineMicroservice.Models
{
    [Table("GAME")]
    public class Game
    {
        public string GameId { get; set; }
    }
}

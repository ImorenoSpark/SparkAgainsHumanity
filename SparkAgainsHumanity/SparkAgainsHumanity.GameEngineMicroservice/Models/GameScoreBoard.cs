using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SparkAgainsHumanity.GameEngineMicroservice.Models
{
    [Table("GameScoreBoard")]
    public class GameScoreBoard
    {
        public string GameId { get; set; }
        public int PlayerId { get; set; }
        public short RoundiD { get; set; }
    }
}

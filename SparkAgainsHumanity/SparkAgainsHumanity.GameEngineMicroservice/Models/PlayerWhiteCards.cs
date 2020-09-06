using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SparkAgainsHumanity.GameEngineMicroservice.Models
{
    [Table("PlayerWhiteCards")]
    public class PlayerWhiteCards
    {
        public short PlayerWhiteCardId { get; set; }
        public int PlayerId { get; set; }
        public string GameId { get; set; }
        public int WhiteCardId { get; set; }
    }
}

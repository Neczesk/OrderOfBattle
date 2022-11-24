import React, {useState, useEffect} from 'react';


import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';

function RulesetCards(){
  const [rulesets, setRulesets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorA, setErrorA] = useState(null)
  const navigate = useNavigate();
  async function getRulesets() {
      try {
          setIsLoading(true);
          const result = await fetch('/getrulesets')
          console.log(typeof(result))
          const parsed = await result.json()
          console.log(typeof(parsed))
          setRulesets(parsed)
      } catch (e) {
          setErrorA(e)
      } finally {
          setIsLoading(false)
      }
  }

  const handleClick = (event, key) => {
    console.log("edit ruleset clicked")
  };

  useEffect(() => {
    getRulesets();
  }, []);

  if (isLoading){
    return (
    <Card>
      <CardContent>
        <CircularProgress/>
      </CardContent>
    </Card>
    )
  } else{
    var ruleset_list = []
    rulesets.forEach(element =>
      ruleset_list.push(JSON.parse(element)))
    console.log(ruleset_list[0])
    return ( 
      ruleset_list.map((ruleset) =>
        <Card key={ruleset.id}>
          <CardContent>
            <Typography variant="h5">
              {ruleset.name}
            </Typography>
            <Typography>
              Version: {ruleset.version}
            </Typography>
            <Divider/>
            <Typography variant="paragraph">
              {ruleset.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>View Ruleset</Button>
            <Button>Edit Ruleset</Button>
          </CardActions>
        </Card>)
    )
  }

}

export default RulesetCards
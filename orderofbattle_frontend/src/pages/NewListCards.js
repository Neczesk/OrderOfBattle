import React, {useState, useEffect} from 'react';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';

function NewListCards(){
  const [rulesets, setRulesets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorA, setErrorA] = useState(null)

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
    return ( 
      ruleset_list.map((ruleset) =>
        <Card key={ruleset.name}>
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
            <Button>Create List</Button>
          </CardActions>
        </Card>)
    )
  }

}

export default NewListCards
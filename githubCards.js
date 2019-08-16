//components - App, Form, cardlist, card

function Card({card}) {
  return(
    <div className="github-profile">
      <img src={card.avatar_url} />
      <div className="info">
        <div className="name">{card.login}</div>
        <div className="name">{card.name}</div>
        <div className="name">{card.blog}</div>
      </div>
    </div>
  )
}

function CardList({profile}) {
  return(
    <div>{profile.map(card => <Card card={card}/>)}</div>
  )  
}

function Form(props) {
  
  const [username, setUsername] = React.useState('');

  handleSubmit = async (event) => {
    event.preventDefault();
    const URL = `https://api.github.com/users/${username}`
    let data = await fetch(URL).then(res => res.json());
    props.addProfile(data);
    setUsername('');
 }
  
  handleChange = () => {
    let username = event.target.value;
    setUsername(username);
  }
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Github Username" onChange={this.handleChange} value={username} />
        <button>Add Card</button>
      </form>
    )
  
}

function App({title}) {
 
  const [profile, setProfile] = React.useState([]);

  addProfile = (newProfile) => {
    let userProfile = [...profile];
    console.log(newProfile)
    if(!userProfile.some(user => user.login === newProfile.login) && !newProfile.message)
    {
      userProfile.push(newProfile);
      setProfile(userProfile);
    }
    
  }
  
  return (
      <>
        <div className="header">{title}</div>
        <Form addProfile = {this.addProfile} />
        <CardList profile={profile} />
      </>
    )
}
ReactDOM.render(<App title="Github Cards App" />, 
document.getElementById('root'));

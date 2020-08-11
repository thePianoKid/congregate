import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './Firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ImageUpload from './ImageUpload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    // where code runs
    db.collection('posts').onSnapshot(snapshot =>{
      // every time a new post is added, this code fires 
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []); // square brackets; where the conditions are set, if none, useEffect triggers onload

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry, you need to login...</h3>
      )}

      <Modal 
      open={open} 
      onClose={() => setOpen(false)} 
      className="app-signup-modal"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div className="app-header">
              <h1 className="app-header-logo">Congregate</h1>
            </div>
            <form className='app-signup' noValidate autoComplete="off">
                <TextField
                id='standard-basic'
                className='signpup-input-field'
                label='Username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <div className='input-padding'></div>

                <TextField
                id='standard-basic'
                className='signpup-input-field'
                label='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
                />
                <div className='input-padding'></div>
              
                <TextField 
                id='standard-basic'
                className='signpup-input-field'
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <div className='input-padding'></div>

                <Button 
                className='signin-button' 
                variant='contained' 
                onClick={signUp}
                type='submit'
                >Sign Up</Button>
              </form>
          </center>
        </div>
      </Modal>

      <Modal 
      open={openSignIn} 
      onClose={() => setOpenSignIn(false)} 
      className="app-login-modal"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div className="app-header">
              <h1 className="app-header-logo">Congregate</h1>
            </div>
            <form className='app-signup' noValidate autoComplete="off">
                <TextField
                id='standard-basic'
                className='signpup-input-field'
                label='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
                />
                <div className='input-padding'></div>
              
                <TextField 
                id='standard-basic'
                className='signpup-input-field'
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <div className='input-padding'></div>

                <Button 
                className='signin-button' 
                variant='contained' 
                onClick={signIn}
                type='submit'
                >Sign In</Button>
              </form>
          </center>
        </div>
      </Modal>

      <div className="app-header">
        <h1 className="app-header-logo">Congregate</h1>
      </div>
      <div className="top-padding"></div>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div className='app-login-container'>
          <Button className='signup-button' variant='contained' onClick={() => setOpen(true)}>Sign Up</Button>
          <Button className='signin-button' variant='contained' onClick={() => setOpenSignIn(true)}>Sign In</Button>
        </div>
      )}

      {
        posts.map(({id, post}) => (
          <Post key={id} username={ post.username } caption={ post.caption } imageUrl={ post.imageUrl }/>
        ))
      }
     
    </div>
  );
}

export default App;

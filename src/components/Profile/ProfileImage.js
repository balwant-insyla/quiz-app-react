import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Avatar, Link } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import { useDispatch, useSelector } from 'react-redux'
import { uploadAvatar } from '../../actions/auth'
import { baseURL } from '../../constants/baseURL'


const useStyles = makeStyles(() => ({ 

    inputImage: {
        display: 'none',
      },
    uploadLink: {
        color: blue[900],
        margin: '10px auto',
        textAlign: 'center',
        padding: '5px 3px'
      },
    avatarSize: {
        width: '250px',
        height: '250px',
        margin: '10px auto',
        textAlign: 'center',
    },
}))
const ProfileImage = () => {
   
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.auth.user)
    const classes = useStyles()
    const avatarBaseURL = baseURL+'/uploads/'
    console.log(avatarBaseURL + user?.avatar)
    const handleUploadClick = async (e) => {
        const formData = new FormData()
        formData.append('avatar', e.target.files[0])
        await dispatch(uploadAvatar(formData))
        
    }
    return (
        <React.Fragment>
        { user.avatar ? (
            <Grid container>
                <Avatar className={ classes.avatarSize } alt={user?.name} src={avatarBaseURL + user?.avatar} />
            </Grid>
        ) : (
            <Grid container>
              <Avatar className={ classes.avatarSize } alt={user?.name} src={avatarBaseURL + 'dummy-profile-pic.png'} />
            </Grid>
           
        )}
        <Grid container>
        <input
            accept="image/*"
            className={classes.inputImage}
            id="avatar-profile-image"
            type="file"
            onChange={handleUploadClick}
        />
        <label className={classes.uploadLink} htmlFor="avatar-profile-image">
            {user.avatar ? ( <Link>Update Profile Image</Link>) : (<Link>Add Profile Image</Link>)}
        </label>
    </Grid>    
        </React.Fragment>
    )
}

export default ProfileImage
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Autocomplete, Badge, TextField } from '@mui/material';
import { PATH } from '../hook/usePath';
import { Context } from '../context/Context';
import SearchIcon from '@mui/icons-material/Search';

const navItems = [
    {
        id: 1,
        title: "Now Playing",
        to: PATH.home
    },
    {
        id: 2,
        title: "Popular",
        to: PATH.popular
    },
    {
        id: 3,
        title: "Top Rated",
        to: PATH.topRated
    },
    {
        id: 4,
        title: "Upcoming",
        to: PATH.upcoming
    },
];

function Navbar() {
    const { likedList } = React.useContext(Context)
    // const [showInput, setShowInput] = React.useState(false)
    // const [searchResult, setSearchResult] = React.useState([
    //     {
    //         label: "Film",
    //         year: "2022"
    //     }
    // ])

    return (
        <Box sx={{ display: 'flex', position: "relative" }}>
            <AppBar className='!bg-[#000000eb]' component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Movies
                    </Typography>
                    <Box>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.id} sx={{ color: '#fff' }}>
                                <NavLink to={item.to}>{item.title}</NavLink>
                            </Button>
                        ))}
                    </Box>
                    <SearchIcon onClick={() => setShowInput(!showInput)} className='scale-[1.5] ml-5 cursor-pointer' />
                    <Box sx={{ display: 'flex', gap: '20px', marginLeft: '30px' }}>
                        <Button variant='outlined' sx={{ borderRadius: "50%", borderColor: 'white' }}>
                            <Badge showZero badgeContent={likedList.length} color="error">
                                <ThumbUpIcon sx={{ color: 'white' }} />
                            </Badge>
                        </Button>
                        <Button variant='outlined' sx={{ borderRadius: "50%", borderColor: 'white' }}>
                            <Badge showZero badgeContent={0} color="primary">
                                <BookmarkIcon sx={{ color: 'white' }} />
                            </Badge>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;

{/* <Autocomplete
                className={`${showInput ? "w-[300px] left-0 right-0" : "!w-0 right-0"} bottom-[115px] duration-300`}
                size='small'
                disablePortal
                options={searchResult}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField size='small' sx={{ backgroundColor: "white", borderRadius: "5px" }} variant='filled' {...params} label="Search Movie" />}
            /> */}
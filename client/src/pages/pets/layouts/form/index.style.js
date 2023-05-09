import BG from 'assets/images/section.jpg'; // Assets

export const btnback = {
    color: '#FFFFFF',
    backgroundColor: '#D1D1D1',
    borderRadius: '7px',
    padding: {
        xs: '5px 12px',
        md: '4px 10px'
    },
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#ADADAD' }
}

export const card = {
    padding: '30px 15px',
    flexGrow: 1,
    backgroundImage: `url(${BG})`,
    borderRadius: '8px',
    border: 'solid 1px #919eab40',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' }
}

export const petimage = {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    width: { 
        xs: '40%', 
        sm: '100%' 
    }, 
    height: 'auto',
    borderRadius: '10px', 
    boxShadow: 1, 
    overflow: 'hidden'
}

export const petseries = {
    fontWeight: 'bold',
    color: '#a7a7a9',
    fontSize: { 
        xs: '110%',
        sm: '100%'
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const petmale = {
    width: '10%',
    color: '#1ec2df',
    fontSize: { xs: '110%' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const datenormal = {
    padding: '10px 0',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#ebebeb' },
    transition: 'all 0.2s ease-in-out',
    width: '100%',
    textAlign: 'center',
    borderRadius: '8px',
    fontWeight: 'bold'
}

export const petfemale = {
    width: '10%',
    color: '#e76165',
    fontSize: { xs: '110%' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const petdesc = {
    width: '90%',
    fontWeight: 'bold',
    color: '#777d9c',
    fontSize: { xs: '125%' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const pettag = {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#c9c9c9',
    padding: '2px 0',
    borderRadius: '50px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const instruction = {
    textAlign: 'center',
    fontWeight:'600',
    fontSize: {
        xs: '97%',
        sm: '102%',
        md: '107%'
    },
    transition: 'all 0.2s ease-in-out'
}

export const input = {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    padding: {
        xs: '6px 8px',
        md: '8px 10px'
    },
    marginBottom: '5px',
    borderRadius: '5px'
}

export const select = {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    padding: {
        xs: '9px 8px',
        md: '10px 10px'
    },
    marginBottom: '5px',
    borderRadius: '5px'
}

export const textarea = {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    borderRadius: '5px',
    fontFamily: 'Gilroy Light',
    fontSize: '105%',
    padding: '10px',
    outline: 'none',
    textTransform: 'uppercase',
    color: '#353b48'
}

export const inputemail = {
    fontWeight:'bold',
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    fontSize: '150%',
    padding: {
        xs: '8px 15px',
        md: '10px 20px'
    },
    marginBottom: '5px',
    borderRadius: '10px'
}

export const inputcode = {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    fontSize: '150%',
    padding: {
        xs: '8px 15px',
        md: '10px 20px'
    },
    marginBottom: '5px',
    borderRadius: '10px'
}

export const btntxt = { 
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#204c6f',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '50px',
    padding: '7px 0',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}

export const date = {
    backgroundColor: '#FFFFFF',
    border: 'solid 1px #dfe4ea',
    padding: {
        xs: '12px 8px 9px 8px',
        md: '9px 10px 6px 10px'
    },
    borderRadius: '5px'
}

export const datedisabled = {
    padding: '10px 0',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: '#b9b9b9',
}

export const dateactive = {
    padding: '10px 0',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    borderRadius: '8px',
    fontWeight: 'bold',
    backgroundColor: '#ebebeb',
}
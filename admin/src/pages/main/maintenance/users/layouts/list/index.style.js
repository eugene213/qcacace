export const title = {
    fontSize: {
        xs: '1.2rem',
        md: '1.3rem'
    },
    fontFamily: 'Gilroy Bold',
    fontWeight: 'bold',
    transition: 'all 0.2s ease-in-out',
    textTransform: 'uppercase'
}

export const search = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: 'solid 1px #dfe4ea',
    borderRadius: '8px',
    padding: '6px 10px',
    width: {
        xs: '200px',
        sm: '350px',
        md: '500px'
    }
}

export const btnicon = {
    display: {
        xs: 'flex',
        md: 'none'
    }, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#204c6f',
    borderRadius: '7px',
    padding: '8px 10px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}

export const btntxt = { 
    display: {
        xs: 'none',
        md: 'block'
    }, 
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: '#204c6f',
    color: '#ffffff',
    borderRadius: '7px',
    padding: '7px 15px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}
import Helmet from 'react-helmet'
const PageTitle = (props) => {
    return (
        < Helmet>
            <title>
                {props.pagetitle}
            </title>
        </Helmet>
    )
}

export default PageTitle

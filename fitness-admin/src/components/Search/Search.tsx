import { Input } from 'reactstrap';

interface PropData {
    keyword: any;
    setKeyword: any;
}

const Search = (props: PropData) => {

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Input
                type="text"
                className="form-control search"
                placeholder="Search"
                value={props.keyword}
                onChange={(e: any) => { props.setKeyword(e.target.value); }}
                onKeyUp={(e: any) => { e.which === 13 && e.target.blur(); }}
                style={{ paddingRight: '2rem' , cursor: 'pointer' }}
            />
            <i className="bi bi-search" style={{ position: 'absolute', right: '10px', pointerEvents: 'none' }}></i>
        </div>
    )
}

export default Search;

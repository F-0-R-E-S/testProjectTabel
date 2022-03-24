import { useAuth0 } from "@auth0/auth0-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import IconSearch from "../../../assets/search.icon"
import { triggerGetUser, triggerGetUsers } from "../../../store/user"
import { ConnectedMainProps } from "../container/main"
import MainTabel from "./mainTabel"

const Main = ({ users, userIds, loading }: ConnectedMainProps) => {
    const dispatch = useDispatch()
    const [pageCount, setPageCount] = useState(0)
    const { isAuthenticated } = useAuth0();
    const fetchIdRef = useRef(0)
    const pageSize = 10

    useEffect(() => {
        dispatch(triggerGetUser())
    }, [])

    const fetchData = useCallback(({ pageIndex = 1 }) => {
        const fetchId = ++fetchIdRef.current

        if (fetchId === fetchIdRef.current) {
            const startRow = pageSize * pageIndex
            const endRow = startRow + pageSize
            if (userIds.length !== 0)
                dispatch(triggerGetUsers(userIds.slice(startRow, endRow)))
            setPageCount(Math.ceil(userIds.length / pageSize))
        }

    }, [userIds])

    return (
        <HomeMain>
            <TabelContainer>
                {isAuthenticated &&
                    <>
                        <HeaderMainContainer>
                            <Search>
                                <IconSearch />
                                <Input placeholder='Поиск' />
                            </Search>
                            <SelectContainer>
                                <Select>
                                    <option>Сортировать по</option>
                                </Select>
                            </SelectContainer>
                        </HeaderMainContainer>
                        <MainTabel users={users} loading={loading} pageCount={pageCount} fetchData={fetchData} />
                    </>
                }

            </TabelContainer>
        </HomeMain>
    )
}

const HomeMain = styled.div`
  width: 100%;
`;

const HeaderMainContainer = styled.div`
padding: 33px 0;
display: flex;
justify-content: space-between;
`;

const Input = styled.input`
background: #F5F8FA;
border-radius: 10px;
width: 281px;
height: 42px;
border: none;
padding-left: 50px;
font-family: 'Gilroy Bold';
font-size: 13px;
color: #A1A5B6;
::placeholder {
    font-family: 'Gilroy Bold';
font-size: 13px;
color: #A1A5B6;
}
`;

const Select = styled.select`
background: #F5F8FA;
width: 267px;
height: 42px;
border: none;
font-family: 'Gilroy Bold';
font-size: 13px;
color: #A1A5B6;
`;

const SelectContainer = styled.div`
background: #F5F8FA;
border-radius: 10px;
width: 281px;
height: 42px;
padding-left: 19px;
`;

const Search = styled.div`
position: relative;
svg {
    position: absolute;
    top: calc(50% - 9px);
    left: 14px;
}
`;

const TabelContainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 0px 10px #F4F4F4;
border-radius: 10px;
padding: 0 23px;
margin-bottom: 50px;
`;


export default Main

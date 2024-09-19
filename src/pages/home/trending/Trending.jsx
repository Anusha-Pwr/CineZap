import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

function tabChangeHandler(tab) {

}

const Trending = () => {
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={["day", "week"]} onTabChange={tabChangeHandler} />
        </ContentWrapper>
    </div>
  )
}

export default Trending;
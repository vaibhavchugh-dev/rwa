import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";
import { TowerContextProvider } from "../pages/pre-built/masters/TowerContext";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/pages/visitor";
 
import Component from "../pages/components/Index";
import Accordian from "../pages/components/Accordions";
import Alerts from "../pages/components/Alerts";
import Badges from "../pages/components/Badges";
import Breadcrumbs from "../pages/components/Breadcrumbs";
import ButtonGroup from "../pages/components/ButtonGroup";
import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";
import Carousel from "../pages/components/Carousel";
import Dropdowns from "../pages/components/Dropdowns";
import FormElements from "../pages/components/forms/FormElements";
import FormLayouts from "../pages/components/forms/FormLayouts";
import FormValidation from "../pages/components/forms/FormValidation";
import Modals from "../pages/components/Modals";
import Pagination from "../pages/components/Pagination";
import Popovers from "../pages/components/Popovers";
import Progress from "../pages/components/Progress";
import Spinner from "../pages/components/Spinner";
import Tabs from "../pages/components/Tabs";
import Toast from "../pages/components/Toast";
import Tooltips from "../pages/components/Tooltips";
import UtilBorder from "../pages/components/UtilBorder";
import UtilColors from "../pages/components/UtilColors";
import UtilDisplay from "../pages/components/UtilDisplay";
import UtilEmbeded from "../pages/components/UtilEmbeded";
import UtilFlex from "../pages/components/UtilFlex";
import UtilOthers from "../pages/components/UtilOthers";
import UtilSizing from "../pages/components/UtilSizing";
import UtilSpacing from "../pages/components/UtilSpacing";
import UtilText from "../pages/components/UtilText";

 

 
import towerpage from "../pages/pre-built/masters/tower";
import TowerPage from "../pages/pre-built/masters/tower";
import TowersList from "../pages/masters/tower";
import OwnerList from "../pages/masters/owners";




 
const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/*Dashboards*/}
        
        {/*Pre-built Pages*/}
        
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/tower`}
          render={() => (
            <TowerContextProvider>
          <TowersList></TowersList>
            </TowerContextProvider>
          )}
        ></Route>
           

        <Route //Context Api added
        exact
        path={`${process.env.PUBLIC_URL}/owners`}
        render={() => (
          <TowerContextProvider>
        <OwnerList></OwnerList>
          </TowerContextProvider>
        )}
      ></Route>
        {/*Demo Pages*/}
        
         
        {/*Components*/}
         
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;

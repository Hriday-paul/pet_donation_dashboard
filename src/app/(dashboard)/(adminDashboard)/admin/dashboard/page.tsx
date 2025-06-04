import LatestUser from "@/components/(adminDashboard)/dashboard/LatestUser";
import ShelterOverviewChart from "@/components/(adminDashboard)/dashboard/ShelterOverviewChart";
import Statistic from "@/components/(adminDashboard)/dashboard/Statistic";
import UserOverviewChart from "@/components/(adminDashboard)/dashboard/UserOverviewChart";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-10 space-y-5 ">
      <Statistic></Statistic>
      <div className="grid grid-cols-2 gap-5 items-center">
        <UserOverviewChart></UserOverviewChart>
        <ShelterOverviewChart />
      </div>
      <LatestUser></LatestUser>
    </div>
  );
};

export default DashboardPage;

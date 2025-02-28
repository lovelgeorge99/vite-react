import { useQuery } from "@tanstack/react-query";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/api";
import { NavLink } from "react-router";
import { type UUID } from "@elizaos/core";
import ConnectionStatus from "./connection-status";
import { useState } from "react";
import ConfigsModal from "./ConfigsModal";
import grantPNG from "../../public/grant.png";

export function AppSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log("in here");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Ckes");
    setIsModalOpen(false);
    console.log(isModalOpen);
  };

  const query = useQuery({
    queryKey: ["agents"],
    queryFn: () => apiClient.getAgents(),
    refetchInterval: 5_000,
  });

  const agents = query?.data?.agents;

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <img
                  src={grantPNG}
                  width="100%"
                  height="100%"
                  className="size-10"
                />

                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-2xl">GrantWize</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Agents</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {query?.isPending ? (
                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuSkeleton />
                    </SidebarMenuItem>
                  ))}
                </div>
              ) : (
                <div>
                  {agents?.map((agent: { id: UUID; name: string }) => (
                    <SidebarMenuItem key={agent.id}>
                      <NavLink to={`/chat/${agent.id}`}>
                        {/* <SidebarMenuButton
                          isActive={location.pathname.includes(agent.id)}
                        >
                          <User />
                          <span>{agent.name}</span>
                        </SidebarMenuButton> */}
                        <div className="   bg-[#A8008C] rounded-md p-3">
                          <div className="flex gap-2">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.62804 0.798584C7.88035 0.798613 8.10207 0.965885 8.17137 1.20848C9.2475 4.97562 10.4555 6.05446 14.0432 7.08023C14.2858 7.14959 14.453 7.37135 14.453 7.62365C14.4529 7.87595 14.2857 8.09767 14.0431 8.16697C10.2766 9.24291 9.19626 10.4509 8.17137 14.0387C8.10206 14.2813 7.88031 14.4486 7.62798 14.4486C7.37565 14.4486 7.1539 14.2813 7.08459 14.0387C6.00845 10.2715 4.80042 9.19271 1.21275 8.16694C0.970169 8.09758 0.802949 7.87582 0.802979 7.62352C0.803008 7.37122 0.970279 7.1495 1.21288 7.08019C4.98002 6.00406 6.05886 4.79602 7.08462 1.20836C7.15398 0.965775 7.37574 0.798555 7.62804 0.798584Z"
                                fill="white"
                              />
                              <path
                                d="M14.453 11.2986C14.5695 11.2986 14.6718 11.3758 14.7038 11.4878C15.2005 13.2264 15.758 13.7244 17.4139 14.1978C17.5258 14.2298 17.603 14.3322 17.603 14.4486C17.603 14.5651 17.5258 14.6674 17.4138 14.6994C15.6754 15.196 15.1768 15.7535 14.7038 17.4094C14.6718 17.5214 14.5694 17.5986 14.453 17.5986C14.3365 17.5986 14.2342 17.5214 14.2022 17.4094C13.7055 15.6707 13.148 15.1728 11.4921 14.6994C11.3801 14.6674 11.303 14.565 11.303 14.4486C11.303 14.3321 11.3802 14.2298 11.4922 14.1978C13.2308 13.7011 13.7288 13.1436 14.2022 11.4877C14.2342 11.3757 14.3366 11.2986 14.453 11.2986Z"
                                fill="white"
                              />
                            </svg>

                            <span className=" font-medium">AI Dashboard</span>
                          </div>
                        </div>
                        {/* <ScoreSliders />{" "} */}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavLink
              to="https://elizaos.github.io/eliza/docs/intro/"
              target="_blank"
            ></NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex gap-2 items-center">
                {" "}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.18779 16.0124C2.49249 16.3172 2.85425 16.559 3.25241 16.7239C3.65056 16.8889 4.07731 16.9738 4.50829 16.9738M2.18779 16.0124C2.80314 16.6277 3.63804 16.9738 4.50829 16.9738M2.18779 16.0124C1.57243 15.397 1.22704 14.5621 1.22704 13.6919V2.20752C1.22704 1.66414 1.66804 1.22314 2.21141 1.22314H6.80516C7.34854 1.22314 7.78954 1.66414 7.78954 2.20752V5.77052M4.50829 16.9738C4.93926 16.9738 5.36601 16.8889 5.76417 16.7239C6.16232 16.559 6.52408 16.3172 6.82879 16.0124M4.50829 16.9738C5.37853 16.9738 6.21343 16.6277 6.82879 16.0124M4.50829 16.9738L15.9927 16.9731C16.536 16.9731 16.977 16.5321 16.977 15.9888V11.395C16.977 10.8516 16.536 10.4106 15.9927 10.4106H12.4297M6.82879 16.0124L12.4297 10.4106M6.82879 16.0124C7.44414 15.397 7.78954 14.5621 7.78954 13.6919V5.77052M12.4297 10.4106L14.9488 7.89064C15.3338 7.50739 15.3338 6.88439 14.9488 6.49939L11.7008 3.25052C11.3158 2.86639 10.6928 2.86639 10.3095 3.25052L7.78954 5.77052M4.50829 13.6919H4.51529V13.6989H4.50829V13.6919Z"
                    stroke="#9FB2CC"
                    strokeWidth="1.575"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Instructions
              </div>
            </SidebarMenuButton>

            <SidebarMenuButton onClick={handleOpenModal}>
              <div
                className="flex gap-2 items-center"
                onClick={handleOpenModal}
              >
                {" "}
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6 15.8C14.2569 15.8 15.6 14.4569 15.6 12.8C15.6 11.1432 14.2569 9.80005 12.6 9.80005C10.9431 9.80005 9.6 11.1432 9.6 12.8C9.6 14.4569 10.9431 15.8 12.6 15.8Z"
                    stroke="#889CB8"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14.365 2.95205C13.998 2.80005 13.532 2.80005 12.6 2.80005C11.668 2.80005 11.202 2.80005 10.835 2.95205C10.5922 3.05256 10.3716 3.19994 10.1857 3.38577C9.99989 3.5716 9.85251 3.79223 9.752 4.03505C9.66 4.25805 9.623 4.51905 9.609 4.89805C9.60249 5.17198 9.5266 5.43978 9.38844 5.6764C9.25028 5.91303 9.05436 6.11074 8.819 6.25105C8.57981 6.38482 8.31059 6.45572 8.03653 6.45712C7.76248 6.45852 7.49255 6.39037 7.252 6.25905C6.916 6.08105 6.673 5.98305 6.432 5.95105C5.90632 5.88192 5.3747 6.02436 4.954 6.34705C4.64 6.59005 4.406 6.99305 3.94 7.80005C3.474 8.60705 3.24 9.01005 3.189 9.40505C3.15463 9.6655 3.17192 9.93017 3.23987 10.1839C3.30781 10.4377 3.42509 10.6756 3.585 10.884C3.733 11.076 3.94 11.237 4.261 11.439C4.734 11.736 5.038 12.242 5.038 12.8C5.038 13.358 4.734 13.864 4.261 14.16C3.94 14.363 3.732 14.524 3.585 14.716C3.42509 14.9245 3.30781 15.1624 3.23987 15.4162C3.17192 15.6699 3.15463 15.9346 3.189 16.195C3.241 16.589 3.474 16.993 3.939 17.8C4.406 18.607 4.639 19.01 4.954 19.253C5.16244 19.413 5.40033 19.5302 5.6541 19.5982C5.90788 19.6661 6.17255 19.6834 6.433 19.649C6.673 19.617 6.916 19.519 7.252 19.341C7.49255 19.2097 7.76248 19.1416 8.03653 19.143C8.31059 19.1444 8.57981 19.2153 8.819 19.349C9.302 19.629 9.589 20.144 9.609 20.702C9.623 21.082 9.659 21.342 9.752 21.565C9.85251 21.8079 9.99989 22.0285 10.1857 22.2143C10.3716 22.4002 10.5922 22.5475 10.835 22.648C11.202 22.8 11.668 22.8 12.6 22.8C13.532 22.8 13.998 22.8 14.365 22.648C14.6078 22.5475 14.8284 22.4002 15.0143 22.2143C15.2001 22.0285 15.3475 21.8079 15.448 21.565C15.54 21.342 15.577 21.082 15.591 20.702C15.611 20.144 15.898 19.628 16.381 19.349C16.6202 19.2153 16.8894 19.1444 17.1635 19.143C17.4375 19.1416 17.7075 19.2097 17.948 19.341C18.284 19.519 18.527 19.617 18.767 19.649C19.0275 19.6834 19.2921 19.6661 19.5459 19.5982C19.7997 19.5302 20.0376 19.413 20.246 19.253C20.561 19.011 20.794 18.607 21.26 17.8C21.726 16.993 21.96 16.59 22.011 16.195C22.0454 15.9346 22.0281 15.6699 21.9601 15.4162C21.8922 15.1624 21.7749 14.9245 21.615 14.716C21.467 14.524 21.26 14.363 20.939 14.161C20.7049 14.0184 20.5109 13.8188 20.375 13.5808C20.2391 13.3427 20.1658 13.0741 20.162 12.8C20.162 12.242 20.466 11.736 20.939 11.44C21.26 11.237 21.468 11.076 21.615 10.884C21.7749 10.6756 21.8922 10.4377 21.9601 10.1839C22.0281 9.93017 22.0454 9.6655 22.011 9.40505C21.959 9.01105 21.726 8.60705 21.261 7.80005C20.794 6.99305 20.561 6.59005 20.246 6.34705C20.0376 6.18714 19.7997 6.06986 19.5459 6.00192C19.2921 5.93397 19.0275 5.91668 18.767 5.95105C18.527 5.98305 18.284 6.08105 17.947 6.25905C17.7066 6.39019 17.4368 6.45824 17.163 6.45684C16.8891 6.45545 16.6201 6.38464 16.381 6.25105C16.1456 6.11074 15.9497 5.91303 15.8116 5.6764C15.6734 5.43978 15.5975 5.17198 15.591 4.89805C15.577 4.51805 15.541 4.25805 15.448 4.03505C15.3475 3.79223 15.2001 3.5716 15.0143 3.38577C14.8284 3.19994 14.6078 3.05256 14.365 2.95205Z"
                    stroke="#889CB8"
                    strokeWidth="1.5"
                  />
                </svg>
                Settings
              </div>
            </SidebarMenuButton>
            <ConfigsModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </SidebarMenuItem>
          <ConnectionStatus />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

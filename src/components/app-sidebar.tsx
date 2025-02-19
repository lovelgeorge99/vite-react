import { useQuery } from "@tanstack/react-query";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/api";
import { NavLink, useLocation } from "react-router";
import { type UUID } from "@elizaos/core";
import { Cog, User } from "lucide-react";
import ConnectionStatus from "./connection-status";
import { useState } from "react";
import ConfigsModal from "./ConfigsModal";

export function AppSidebar() {
  const location = useLocation();
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

  const handleSubmitAllocation = (allocation: Record<string, number>) => {
    console.log("Budget allocation submitted:", allocation);
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
                {/* <img
                  src="/elizaos-icon.png"
                  width="100%"
                  height="100%"
                  className="size-7"
                /> */}

                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Qacc Agent</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Agents</SidebarGroupLabel>
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
                        <SidebarMenuButton
                          isActive={location.pathname.includes(agent.id)}
                        >
                          <User />
                          <span>{agent.name}</span>
                        </SidebarMenuButton>
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
              <div className="flex gap-2" onClick={handleOpenModal}>
                {" "}
                <Cog /> Settings
              </div>
            </SidebarMenuButton>
            <ConfigsModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleSubmitAllocation}
            />
          </SidebarMenuItem>
          <ConnectionStatus />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

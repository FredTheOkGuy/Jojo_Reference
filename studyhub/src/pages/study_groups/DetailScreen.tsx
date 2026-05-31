import type { StudyGroup } from "../../app/StudyHubApp";
import TopBar from "../../components/ui/TopBar";
import Button from "../../components/ui/Button";
import { Card, InfoGrid } from "../../components/ui/Card";
import { MembersList, DocumentsList } from "../../components/ui/ContentLists";
import { GI_COLORS_MAP } from "../../data/mockData";

interface DetailScreenProps {
  group: StudyGroup;
  onBack: () => void;
  onChat: () => void;
  onLeave: () => void;
}

export default function DetailScreen({
  group,
  onBack,
  onChat,
  onLeave,
}: DetailScreenProps) {
  const pct = Math.round((group.cur / group.max) * 100);
  const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP["gi-orange"];
  const capacityClass =
    pct >= 100 ? "bg-[#c96332]" : pct >= 75 ? "bg-[#8a6a1e]" : "bg-[#5a6e3a]";

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar showBackButton onBackClick={onBack} />

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-5 py-7">
        {/* Hero Section */}
        <Card className="mb-4">
          <div className="flex gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {group.icon}
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#1a1610] font-['Syne'] mb-1">
                {group.name}
              </h1>
              <p className="text-sm text-[#9a9282]">{group.course}</p>
            </div>
          </div>
          <p className="text-[#4a4438] text-sm leading-relaxed mb-4">
            {group.desc}
          </p>
          <div className="flex gap-3">
            <Button label="Chat" onClick={onChat} variant="primary" fullWidth />
            <Button label="Leave" onClick={onLeave} variant="danger" fullWidth />
          </div>
        </Card>

        {/* Info Grid */}
        <InfoGrid
          items={[
            { label: "Location", value: group.location },
            { label: "Schedule", value: `${group.days}\n${group.time}` },
            { label: "Members", value: `${group.cur} / ${group.max}` },
            {
              label: "Capacity",
              value: (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#e4e0d6] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${capacityClass}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs">{pct}%</span>
                </div>
              ),
            },
          ]}
          columns={2}
        />

        {/* Members Section */}
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#4a4438] uppercase tracking-wider mb-3">
            Members
          </h2>
          <MembersList members={group.members} />
        </div>

        {/* Documents Section */}
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#4a4438] uppercase tracking-wider mb-3">
            Documents
          </h2>
          <DocumentsList documents={group.docs} />
        </div>
      </div>
    </div>
  );
}
              {group.cur} / {group.max}
            </div>
            <div className="w-full h-1 bg-[#e4e0d6] rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${capacityClass}`}
                style={{ width: `${pct}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-lg p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282] mb-2">
              Capacity
            </div>
            <div className="text-sm font-bold text-[#1a1610]">{pct}% Full</div>
          </div>
        </div>

        {/* Members */}
        <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-lg p-4 mb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282] mb-3">
            Members
          </div>
          <div className="space-y-2">
            {group.members.length === 0 ? (
              <p className="text-sm text-[#9a9282]">No members yet</p>
            ) : (
              group.members.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: member.c }}
                  >
                    {member.i}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#1a1610]">
                      {member.n}
                      {member.owner && (
                        <span className="ml-2 text-xs bg-[#faeade] text-[#c96332] px-2 py-0.5 rounded font-bold">
                          Host
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#9a9282]">{member.r}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-lg p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282] mb-3">
            Documents
          </div>
          <div className="space-y-2">
            {group.docs.length === 0 ? (
              <p className="text-sm text-[#9a9282]">No documents yet</p>
            ) : (
              group.docs.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 bg-[#edeae2] rounded-lg cursor-pointer hover:bg-[#ddd8cc] transition-colors"
                >
                  <div className="text-xs font-bold text-[#8a6a1e]">
                    {doc.t.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#1a1610] truncate">
                      {doc.n}
                    </div>
                  </div>
                  <div className="text-xs text-[#9a9282]">{doc.s}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

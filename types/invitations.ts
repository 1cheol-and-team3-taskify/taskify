export interface InitialInvitations {
  totalCount: number;
  invitations: [
    {
      id: number;
      inviter: {
        nickname: string;
        email: string;
        id: number;
      };
      teamId: string;
      dashboard: {
        title: string;
        id: number;
      };
      invitee: {
        nickname: string;
        email: string;
        id: number;
      };
      inviteAccepted: boolean;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

interface MappedInvitation {
  id: number;
  inviteAccepted: boolean;
  inviter: string;
  dashboard: string;
}

export interface MappedInvitations extends Array<MappedInvitation> {}

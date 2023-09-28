//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// vault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vaultABI = [
  { type: 'error', inputs: [], name: 'AutomationVault_ETHTransferFailed' },
  { type: 'error', inputs: [], name: 'AutomationVault_ExecFailed' },
  { type: 'error', inputs: [], name: 'AutomationVault_NotApprovedJobFunction' },
  { type: 'error', inputs: [], name: 'AutomationVault_NotApprovedRelayCaller' },
  {
    type: 'error',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'AutomationVault_OnlyOwner',
  },
  {
    type: 'error',
    inputs: [{ name: '_pendingOwner', internalType: 'address', type: 'address' }],
    name: 'AutomationVault_OnlyPendingOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_owner', internalType: 'address', type: 'address', indexed: true }],
    name: 'AcceptOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_job', internalType: 'address', type: 'address', indexed: true }],
    name: 'ApproveJob',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_job', internalType: 'address', type: 'address', indexed: true },
      { name: '_functionSelector', internalType: 'bytes4', type: 'bytes4', indexed: true },
    ],
    name: 'ApproveJobFunction',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_relay', internalType: 'address', type: 'address', indexed: true }],
    name: 'ApproveRelay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_relay', internalType: 'address', type: 'address', indexed: true },
      { name: '_caller', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ApproveRelayCaller',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_pendingOwner', internalType: 'address', type: 'address', indexed: true }],
    name: 'ChangeOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_relay', internalType: 'address', type: 'address', indexed: true },
      { name: '_relayCaller', internalType: 'address', type: 'address', indexed: true },
      { name: '_feeRecipient', internalType: 'address', type: 'address', indexed: true },
      { name: '_feeToken', internalType: 'address', type: 'address', indexed: false },
      { name: '_fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'IssuePayment',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_relay', internalType: 'address', type: 'address', indexed: true },
      { name: '_relayCaller', internalType: 'address', type: 'address', indexed: true },
      { name: '_job', internalType: 'address', type: 'address', indexed: true },
      { name: '_jobData', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'JobExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_job', internalType: 'address', type: 'address', indexed: true }],
    name: 'RevokeJob',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_job', internalType: 'address', type: 'address', indexed: true },
      { name: '_functionSelector', internalType: 'bytes4', type: 'bytes4', indexed: true },
    ],
    name: 'RevokeJobFunction',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_relay', internalType: 'address', type: 'address', indexed: true }],
    name: 'RevokeRelay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_relay', internalType: 'address', type: 'address', indexed: true },
      { name: '_caller', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RevokeRelayCaller',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_token', internalType: 'address', type: 'address', indexed: true },
      { name: '_amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: '_receiver', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'WithdrawFunds',
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'acceptOwner', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_job', internalType: 'address', type: 'address' },
      { name: '_functionSelectors', internalType: 'bytes4[]', type: 'bytes4[]' },
    ],
    name: 'approveJobFunctions',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_relay', internalType: 'address', type: 'address' },
      { name: '_callers', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'approveRelayCallers',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pendingOwner', internalType: 'address', type: 'address' }],
    name: 'changeOwner',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_relayCaller', internalType: 'address', type: 'address' },
      {
        name: '_execData',
        internalType: 'struct IAutomationVault.ExecData[]',
        type: 'tuple[]',
        components: [
          { name: 'job', internalType: 'address', type: 'address' },
          { name: 'jobData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: '_feeData',
        internalType: 'struct IAutomationVault.FeeData[]',
        type: 'tuple[]',
        components: [
          { name: 'feeRecipient', internalType: 'address', type: 'address' },
          { name: 'feeToken', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'exec',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_job', internalType: 'address', type: 'address' }],
    name: 'jobEnabledFunctions',
    outputs: [{ name: '_enabledSelectors', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'jobs',
    outputs: [{ name: '__jobs', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'organizationName',
    outputs: [{ name: '_organizationName', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '_pendingOwner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_relay', internalType: 'address', type: 'address' }],
    name: 'relayEnabledCallers',
    outputs: [{ name: '_enabledCallers', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'relays',
    outputs: [{ name: '__relays', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_job', internalType: 'address', type: 'address' },
      { name: '_functionSelectors', internalType: 'bytes4[]', type: 'bytes4[]' },
    ],
    name: 'revokeJobFunctions',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_relay', internalType: 'address', type: 'address' },
      { name: '_callers', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'revokeRelayCallers',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_receiver', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawFunds',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// vaultFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vaultFactoryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address', indexed: true },
      { name: '_organizationName', internalType: 'string', type: 'string', indexed: true },
      { name: '_automationVault', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'DeployAutomationVault',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'automationVaults',
    outputs: [{ name: '__automationVaults', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_organizationName', internalType: 'string', type: 'string' },
    ],
    name: 'deployAutomationVault',
    outputs: [{ name: '_automationVault', internalType: 'contract IAutomationVault', type: 'address' }],
  },
] as const;

import { UMB_AUTH, UmbLoggedInUser } from "@umbraco-cms/backoffice/auth";
import { LitElement, css, html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbUserDetail,  } from "@umbraco-cms/backoffice/users";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

// import { UmbUserDetail, UmbUserRepository } from "@umbraco-cms/backoffice/users";

// commented out missing functionality


@customElement('my-welcome-dashboard')
export class MyWelcomeDashboardElement extends UmbElementMixin(LitElement) {
	@state()
	private _currentUser?: UmbLoggedInUser;

	@state()
	private _userData?: Array<UmbUserDetail>;

	private _auth?: typeof UMB_AUTH.TYPE;

	// private _userRepository = new UmbUserRepository(this);

	constructor() {
		super();
		this.consumeContext(UMB_AUTH, (instance) => {
			this._auth = instance;
			this._observeCurrentUser();
		});
		// this._getDataFromRepository();
	}

	//Get the current user
	private async _observeCurrentUser() {
		if (!this._auth) return;
		this.observe(this._auth.currentUser, (currentUser) => {
			this._currentUser = currentUser;
		});
	}

	//Get all users
	// private async _getDataFromRepository() {
	// 	const { data } = await this._userRepository.requestCollection();
	// 	this._userData = data?.items;
	// }

	render() {
		return html`
			<uui-box>
			<span slot="headline">
                <umb-localize key="welcomeDashboard_heading">Welcome</umb-localize>
                ${this._currentUser?.name ?? 'Unknown'}!
            </span>
			<div>
				<p>
					<umb-localize key="welcomeDashboard_bodytext">
						This is the Backoffice. From here, you can modify the content, media, and settings of your website.
					</umb-localize>
				</p>
				<p>
					<umb-localize key="welcomeDashboard_copyright"> © Sample Company 20XX </umb-localize>
				</p>
			</div>
			<div id="users-wrapper">${this._userData?.map((user) => this._renderUser(user))}</div>
			</uui-box>

			<uui-box>
			<uui-table id="users-wrapper">
				<uui-table-row>
					<uui-table-head-cell>Name</uui-table-head-cell>
					<uui-table-head-cell>Email</uui-table-head-cell>
					<uui-table-head-cell>languages</uui-table-head-cell>
				</uui-table-row>
				<uui-table-row class="user">
					<uui-table-cell>${this._currentUser?.name}</uui-table-cell>
					<uui-table-cell>${this._currentUser?.email}</uui-table-cell>
					<uui-table-cell>
						<uui-tag color="positive" look="primary">${this._currentUser?.languages?.length}</uui-tag>	
					</uui-table-cell>
				</uui-table-row>
			</uui-table>
		</uui-box>

		<div style="width: 200px;">
			<uui-card-user name="John Rabbit" href="www.google.com" target="_blank">
				
				<div style="margin-bottom: 12px">Editors</div>
				<div>Has not logged in yet</div>

			</uui-card-user>
		</div>
		`;
	// ${this._userData?.map((user) => this._renderUser(user))}
	}

	// private _renderUser(user: UmbUserDetail) {
	// 	if (!user) return;
	// 	return html`<uui-table-row class="user">
	// 		<uui-table-cell>${user.name}</uui-table-cell>
	// 		<uui-table-cell>${user.email}</uui-table-cell>
	// 		<uui-table-cell>${user.state}</uui-table-cell>
	// 	</uui-table-row>`;

	private _renderUser(user: UmbUserDetail) {
		return html`<div class="user">
			<div>${user.name}</div>
			<div>${user.email}</div>
			<div>${user.state}</div>
		</div>`;
	}

	static styles = [
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			uui-table-head-cell {
				font-weight: bold;
			}

			.user:hover,
			.user:focus {
				cursor: pointer;
				background-color: var(--uui-color-surface-alt);
			}

			#users-wrapper {
				border: 1px solid lightgray;
			}

			.user {
				padding: 5px 10px;
			}

			.user:not(:first-child) {
				border-top: 1px solid lightgray;
			}
		`,
	];
}

export default MyWelcomeDashboardElement;

declare global {
	interface HTMLElementTagNameMap {
		'my-welcome-dashboard': MyWelcomeDashboardElement;
	}
}
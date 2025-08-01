import React from 'react';
import ActionMenu from './actionMenu';
import IconSVG from './icon';

const ListView = ({
  img,
  svg,
  titulo,
  subtitulo,
  parrafo,
  actionMenuProps,
  toggleMenuActions,
  item
}) => (
  <tr>
    <td className="img_list_dashboard">
      <div className="img_list_dashboard_content">
        <figure>
          {img === undefined ? (
            <IconSVG name={svg} />
          ) : (
            <img
              src={`${img}`}
              alt={String(item.id)}
            />
          )}
        </figure>
        {titulo}
      </div>
    </td>

    <td>{subtitulo}</td>
    <td>{parrafo}</td>

    <td>
      <div className="icon_list_action_content">
        <div
          className="icon_list_action"
          onClick={() => toggleMenuActions(item.id)}
        >
          <IconSVG name="IconX" />
        </div>
        <ActionMenu {...actionMenuProps(item)} />
      </div>
    </td>
  </tr>
);

export default ListView;

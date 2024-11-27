import './ModuleCard.css';

interface ModuleCardProps {
	link: string;
	name: string;
}

function ModuleCard({ link, name }: ModuleCardProps) {
	return <>
		<div className="card">
			<a href={link}>
				<h2>{name}</h2>
			</a>
		</div>
	</>;
}

export default ModuleCard;